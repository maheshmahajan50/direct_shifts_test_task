class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :password, :password_confirmation, :email, :referral_id])
  end
end
