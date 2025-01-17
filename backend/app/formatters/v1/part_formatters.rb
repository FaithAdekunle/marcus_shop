module V1
  class PartFormatters
    def create
      { include: [], fields: { part: ::V1::PartSerializer::ATTRIBUTES } }
    end

    def update
      create
    end
  end
end
