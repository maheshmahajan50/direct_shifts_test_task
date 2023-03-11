class ReferralMailer < ApplicationMailer
  default from: "directshifts@yopmail.com"

  def referral_email
    @invite_link = params[:invite_link]
    @current_user = params[:current_user]
    mail(to: params[:email], subject: 'Welcome to My Awesome Site')
  end
end
