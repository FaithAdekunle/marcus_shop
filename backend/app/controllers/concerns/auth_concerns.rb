module AuthConcerns
  extend ActiveSupport::Concern

  def render_user
    formatter = ::V1::UserFormatters.new.current_user
    render json: ::V1::UserSerializer.new(@resource, formatter).serializable_hash
  end
end
