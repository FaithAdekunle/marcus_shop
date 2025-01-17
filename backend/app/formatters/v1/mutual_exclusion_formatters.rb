module V1
  class MutualExclusionFormatters
    def create
      { include: [], fields: { mutual_exclusion: ::V1::MutualExclusionSerializer::ATTRIBUTES } }
    end
  end
end
