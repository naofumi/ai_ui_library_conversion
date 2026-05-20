import React from "react"

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "./ui/native-select"

export default function ShadcnNativeSelectDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <NativeSelect>
          <NativeSelectOption value="">Select status</NativeSelectOption>
          <NativeSelectOption value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
          <NativeSelectOption value="done">Done</NativeSelectOption>
          <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
        </NativeSelect>

        <NativeSelect size="sm">
          <NativeSelectOption value="">Small select</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelect>
      </div>

      <NativeSelect>
        <NativeSelectOption value="">Select department</NativeSelectOption>
        <NativeSelectOptGroup label="Engineering">
          <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
          <NativeSelectOption value="backend">Backend</NativeSelectOption>
          <NativeSelectOption value="devops">DevOps</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Sales">
          <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
          <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
          <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Operations">
          <NativeSelectOption value="support">Customer Support</NativeSelectOption>
          <NativeSelectOption value="product-manager">Product Manager</NativeSelectOption>
          <NativeSelectOption value="ops-manager">Operations Manager</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>

      <div className="grid gap-3">
        <NativeSelect disabled>
          <NativeSelectOption value="">Select priority</NativeSelectOption>
          <NativeSelectOption value="low">Low</NativeSelectOption>
          <NativeSelectOption value="medium">Medium</NativeSelectOption>
          <NativeSelectOption value="high">High</NativeSelectOption>
          <NativeSelectOption value="critical">Critical</NativeSelectOption>
        </NativeSelect>

        <NativeSelect aria-invalid="true">
          <NativeSelectOption value="">Select role</NativeSelectOption>
          <NativeSelectOption value="admin">Admin</NativeSelectOption>
          <NativeSelectOption value="editor">Editor</NativeSelectOption>
          <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
          <NativeSelectOption value="guest">Guest</NativeSelectOption>
        </NativeSelect>
      </div>

      <div dir="rtl">
        <NativeSelect>
          <NativeSelectOption value="">اختر الحالة</NativeSelectOption>
          <NativeSelectOption value="todo">مهام</NativeSelectOption>
          <NativeSelectOption value="in-progress">قيد التنفيذ</NativeSelectOption>
          <NativeSelectOption value="done">منجز</NativeSelectOption>
          <NativeSelectOption value="cancelled">ملغي</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}
