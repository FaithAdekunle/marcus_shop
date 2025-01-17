module AuthConcerns
  extend ActiveSupport::Concern

  def render_user
    options = ::V1::UserOptions.new.current_user
    render json: ::V1::UserSerializer.new(@resource, options).serializable_hash
  end
end
