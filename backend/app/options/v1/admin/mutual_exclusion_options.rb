module V1
  module Admin
    class MutualExclusionOptions
      def create
        { include: [], fields: { mutual_exclusion: ::V1::MutualExclusionSerializer::ATTRIBUTES } }
      end
    end
  end
end
