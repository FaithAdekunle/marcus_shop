
module Api
  module V1
    class CartItemsController < BaseController
      def index
        cart_items = CartItem.includes(:cart_item_options, product: { parts: { options: [ :excluders, :adjustees ] } }).where(user_id: current_api_v1_user.id).all
        formatter = ::V1::CartItemFormatters.new.index

        render json: ::V1::CartItemSerializer.new(cart_items, formatter).serializable_hash
      end

      def create
        cart_item = CartIem.new(cart_item_params)

        ActiveRecord::Base.transaction do
          cart_item.save!
          CartItemOption.insert_all(option_ids.map { |id| { cart_item_id: cart_item.id, option_id: id } })
        end

        head :created
      end

      def update
        cart_item = CartItem.find(params[:id])

        ActiveRecord::Base.transaction do
          cart_item.update!(cart_item_params)
          CartItemOption.where(cart_item_id: cart_item.id).delete_all
          CartItemOption.insert_all(option_ids.map { |id| { cart_item_id: cart_item.id, option_id: id } })
        end

        cart_item = CartItem.includes(:cart_item_options, product: { parts: { options: [ :excluders, :adjustees ] } }).find(params[:id])
        formatter = ::V1::CartItemFormatters.new.update

        render json: ::V1::CartItemSerializer.new(cart_item, formatter).serializable_hash
      end

      def destroy
        cart_item = CartItem.find(params[:id])
        cart_item.destroy

        head :no_content
      end

      private

      def cart_item_params
        params.permit(:quantity, :product_id).tap { |p| p[:user_id] = current_api_v1_user.id }
      end

      def option_ids
        params.permit(option_ids: [])
      end
    end
  end
end
