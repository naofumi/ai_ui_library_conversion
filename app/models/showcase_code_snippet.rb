class ShowcaseCodeSnippet
  def self.from_file(path)
    normalize(File.read(Rails.root.join(path)))
  end

  def self.from_file_between(path:, start_marker:, end_marker:)
    content = File.read(Rails.root.join(path))

    start_index = content.index(start_marker)
    end_index = content.index(end_marker)

    raise KeyError, "Start marker not found: #{start_marker}" unless start_index
    raise KeyError, "End marker not found: #{end_marker}" unless end_index
    raise KeyError, "End marker appears before start marker" if end_index <= start_index

    snippet_start = start_index + start_marker.length
    normalize(content[snippet_start...end_index])
  end

  def self.normalize(content)
    content.to_s.gsub(/\A[\r\n]+|[\r\n]+\z/, "")
  end
end
