class User < ActiveRecord::Base
  has_many :skills, :through => :skill_id
end
