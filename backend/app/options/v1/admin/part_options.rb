module V1
  module Admin
    class PartOptions
      def create
        { include: [], fields: { part: ::V1::PartSerializer::ATTRIBUTES } }
      end

      def update
        create
      end
    end
  end
end
