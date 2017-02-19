class Like < ActiveRecord::Base
  belongs_to :user_skill
  belongs_to :user

  validates :user_skill,
    uniqueness: {
      message: "既にlikeしています",
      scope: [:user]
    }
end
