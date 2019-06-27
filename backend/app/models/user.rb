class User < ApplicationRecord
    has_secure_password
    has_many :pets
    has_many :comments
    belongs_to :address

    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    # validates :password,
            # length: { minimum: 6 },
            # if: -> { new_record? || !password.nil? }

end
