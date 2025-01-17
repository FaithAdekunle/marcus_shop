module V1
  class OptionFormatters
    def create
      { include: [], fields: { option: ::V1::OptionSerializer::ATTRIBUTES } }
    end

    def update
      create
    end
  end
end
