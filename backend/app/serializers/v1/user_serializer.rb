module V1
  class UserSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id role name email].freeze

    attributes(*ATTRIBUTES)
  end
end
