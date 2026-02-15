#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import { chromium } from "playwright"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"

const rootDir = process.cwd()
const outputDir = path.join(rootDir, "tmp", "parity", "mui-input")
const appHost = process.env.PARITY_APP_HOST || "http://localhost:3000"
const targetUrl = `${appHost.replace(/\/+$/, "")}/mui/input`
const states = ["default", "hover", "focus", "error"]

async function run() {
  buildAssets()
  prepareOutputDir()
  await runCapture()
  writeReport()
  console.log(`Parity artifacts written to ${outputDir}`)
}

function buildAssets() {
  console.log("Building JS/CSS assets...")
  execSync("yarn build", { stdio: "inherit" })
  execSync("yarn build:css", { stdio: "inherit" })
}

function prepareOutputDir() {
  fs.rmSync(outputDir, { recursive: true, force: true })
  fs.mkdirSync(outputDir, { recursive: true })
}

function screenshotPath(side, state) {
  return path.join(outputDir, `${side}-${state}.png`)
}

function diffPath(state) {
  return path.join(outputDir, `diff-${state}.png`)
}

const results = {}

async function runCapture() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1600, height: 1800 } })

  try {
    await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 20000 })

    const sourceMount = page.locator('[data-react="mui-input-demo"]')
    const convertedShell = page.locator(".mu-input-shell")
    await sourceMount.waitFor({ state: "visible", timeout: 15000 })
    await convertedShell.waitFor({ state: "visible", timeout: 15000 })

    await expectMinimumCount(sourceMount.locator("input"), 4, "source inputs")
    await expectMinimumCount(convertedShell.locator("input.mu-input"), 4, "converted inputs")

    await capturePair("default", sourceMount, convertedShell)

    await sourceMount.locator("input").first().hover()
    await page.waitForTimeout(40)
    await captureSingle("source", "hover", sourceMount)
    await convertedShell.locator("input.mu-input").first().hover()
    await page.waitForTimeout(40)
    await captureSingle("converted", "hover", convertedShell)

    await sourceMount.locator("input").first().click()
    await page.waitForTimeout(40)
    await captureSingle("source", "focus", sourceMount)
    await convertedShell.locator("input.mu-input").first().click()
    await page.waitForTimeout(40)
    await captureSingle("converted", "focus", convertedShell)

    await capturePair("error", sourceMount, convertedShell)

    for (const state of states) {
      diffState(state)
    }
  } catch (error) {
    try {
      await page.screenshot({ path: path.join(outputDir, "debug_page.png"), fullPage: true })
      fs.writeFileSync(path.join(outputDir, "debug_page.html"), await page.content())
    } catch {
      // Best-effort debug capture only.
    }
    throw error
  } finally {
    await browser.close()
  }
}

async function expectMinimumCount(locator, minimum, name) {
  const count = await locator.count()
  if (count < minimum) {
    throw new Error(`Expected at least ${minimum} ${name}, got ${count}`)
  }
}

async function capturePair(state, sourcePanel, convertedPanel) {
  await captureSingle("source", state, sourcePanel)
  await captureSingle("converted", state, convertedPanel)
}

async function captureSingle(side, state, locator) {
  await locator.screenshot({ path: screenshotPath(side, state) })
}

function diffState(state) {
  const sourceImg = PNG.sync.read(fs.readFileSync(screenshotPath("source", state)))
  const convertedImg = PNG.sync.read(fs.readFileSync(screenshotPath("converted", state)))
  const width = Math.max(sourceImg.width, convertedImg.width)
  const height = Math.max(sourceImg.height, convertedImg.height)

  const sourceNorm = normalizePng(sourceImg, width, height)
  const convertedNorm = normalizePng(convertedImg, width, height)
  const diff = new PNG({ width, height })

  const differingPixels = pixelmatch(
    sourceNorm.data,
    convertedNorm.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  )

  fs.writeFileSync(diffPath(state), PNG.sync.write(diff))
  const totalPixels = width * height
  const mismatchPercent = Number(((differingPixels / totalPixels) * 100).toFixed(2))
  results[state] = { differingPixels, totalPixels, mismatchPercent }
}

function normalizePng(image, targetWidth, targetHeight) {
  if (image.width === targetWidth && image.height === targetHeight) return image

  const normalized = new PNG({ width: targetWidth, height: targetHeight })
  PNG.bitblt(image, normalized, 0, 0, image.width, image.height, 0, 0)
  return normalized
}

function writeReport() {
  const lines = []
  lines.push("# MUI Input Parity Report")
  lines.push("")
  lines.push(`Generated at: ${new Date().toISOString()}`)
  lines.push(`Target: ${targetUrl}`)
  lines.push("")
  lines.push("| State | Mismatch % | Diff Pixels | Total Pixels | Diff Image |")
  lines.push("| --- | ---: | ---: | ---: | --- |")

  for (const state of states) {
    const result = results[state]
    if (!result) {
      lines.push(`| ${state} | error | - | - | n/a |`)
      continue
    }
    lines.push(`| ${state} | ${result.mismatchPercent} | ${result.differingPixels} | ${result.totalPixels} | ${path.basename(diffPath(state))} |`)
  }

  lines.push("")
  lines.push(`Artifacts are in \`${outputDir}\`.`)
  fs.writeFileSync(path.join(outputDir, "report.md"), `${lines.join("\n")}\n`)
}

run().catch((error) => {
  const message = String(error?.message || error)

  if (message.includes("ECONNREFUSED") || message.includes("ERR_CONNECTION_REFUSED")) {
    console.error(`Could not reach app host at ${targetUrl}. Start the app (e.g. bin/dev) or set PARITY_APP_HOST.`)
  } else if (message.includes("browserType.launch")) {
    console.error("Playwright could not launch Chromium in this environment. Run locally in your normal terminal session.")
  }

  console.error(error)
  process.exit(1)
})
