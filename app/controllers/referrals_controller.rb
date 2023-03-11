class ReferralsController < ApplicationController
  def index
    @referrals = current_user.referrals
  end

  def create
    @referral = Referral.new(referral_params)
    if @referral.save
      render json: {status: 200, message: "Referral email sent successfully."} 
    else
      render json: { errors: @referral.errors }
    end
  end

  private

  def send_referral_mail
    ReferralMailer.with(email: params[:email], invite_link: invite_link, current_user: current_user).referral_email.deliver_now
  end

  def invite_link
    request.base_url + "/auth?referral_id=#{current_user.id}"
  end

  def referral_params
    params.require(:referral).permit(:email, :user_id)
  end
end