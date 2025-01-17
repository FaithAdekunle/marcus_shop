module V1
  module Admin
    class OptionOptions
      def create
        { include: [], fields: { option: ::V1::OptionSerializer::ATTRIBUTES } }
      end

      def update
        create
      end
    end
  end
end
