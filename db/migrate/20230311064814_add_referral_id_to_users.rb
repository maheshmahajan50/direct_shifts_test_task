class AddReferralIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referral_id, :integer
  end
end
