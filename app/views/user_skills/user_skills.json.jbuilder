json.array! @user_skills  do |user_skill|
  @skill = Skill.find(user_skill.skill_id)
  json.id @skill.id
  json.name @skill.name
  json.liked user_skill.likes.size
end
