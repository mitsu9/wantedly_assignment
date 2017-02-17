class Skill < ActiveRecord::Base
  has_many :users, :through => :user_id
end
