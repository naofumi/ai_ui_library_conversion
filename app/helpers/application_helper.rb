module ApplicationHelper
  def highlight_showcase_code(code, language)
    formatter.format(lexer(language).lex(code.to_s))
  end

  def showcase_code_language_from_title(title)
    normalized = title.to_s.downcase
    return "jsx" if normalized.include?("react")
    return "erb" if normalized.include?("erb")

    "plaintext"
  end

  private

  def formatter
    @formatter ||= Rouge::Formatters::HTML.new
  end

  def lexer(language)
    case language.to_s
    when "erb"
      Rouge::Lexers::ERB.new
    when "jsx", "javascript", "js"
      Rouge::Lexers::Javascript.new
    else
      Rouge::Lexers::PlainText.new
    end
  end
end
