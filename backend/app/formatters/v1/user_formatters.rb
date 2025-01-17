module V1
  class UserFormatters
    def current_user
      { include: [], fields: { user: ::V1::UserSerializer::ATTRIBUTES } }
    end
  end
end
