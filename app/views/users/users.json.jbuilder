json.array! @users do |user|
  json.user user, :id, :name, :created_at, :updated_at
end
