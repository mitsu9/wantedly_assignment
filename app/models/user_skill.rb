class UserSkill < ActiveRecord::Base
  belongs_to :user_id
  belongs_to :skill_id
end
