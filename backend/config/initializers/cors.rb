# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

default_cors_headers = {
  headers: :any,
  credentials: false,
  methods: %i[get post options head]
}

cors_headers_internal = default_cors_headers.merge(
  credentials: true,
  expose: %i[access-token expiry token-type uid client content-disposition],
  methods: %i[get post put patch delete options head]
)

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins [ "http://localhost:7001" ]

    resource "*", cors_headers_internal
  end
end
