class UserSkill < ActiveRecord::Base
  belongs_to :user
  belongs_to :skill

  has_many :likes
  has_many :users, :through => :likes
end
