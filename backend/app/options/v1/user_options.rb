module V1
  class UserOptions
    def current_user
      { include: [], fields: { user: ::V1::UserSerializer::ATTRIBUTES } }
    end
  end
end
