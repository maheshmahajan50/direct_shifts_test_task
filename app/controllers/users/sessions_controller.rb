# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts={})
    byebug
    render json: {status: 200, message: 'Logged In successfully.'}
  end

  def respond_to_on_destroy
    if current_user
      render json: {status: 200, message: 'Logged out Scueessfully.'}
    else
      render json: {status: 404, message: 'Not found active user sesssion.'}
    end
  end
end
