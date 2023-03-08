# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts={})
    if resource.persisted?
      render json: {status: 200, message: 'Signup Sucessfully.'}
    else
      render json: {message: 'Somethign went wrong.'}
    end
  end
end
