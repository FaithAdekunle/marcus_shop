module V1
  class PartFormatters
    def create
      { include: [ :options ], fields: { part: ::V1::PartSerializer::ATTRIBUTES, option: ::V1::OptionSerializer::ATTRIBUTES  } }
    end

    def update
      create
    end
  end
end
