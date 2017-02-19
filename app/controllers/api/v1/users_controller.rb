module Api
  module V1
    class UsersController < ApplicationController
      skip_before_filter :verify_authenticity_token
      before_action :set_user, only: [:show, :edit, :update, :destroy]

      # GET /users
      # GET /users.json
      def index
        @users = User.all
        render 'users/users', formats: 'json', handlers: 'jbuilder'
      end

      # GET /users/1
      # GET /users/1.json
      def show
        render json: @user
      end

      # GET /users/new
      # def new
      #   @user = User.new
      # end

      # GET /users/1/edit
      # def edit
      # end

      # POST /users
      # POST /users.json
      def create
        @user = User.new(user_params)

        if @user.save
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /users/1
      # PATCH/PUT /users/1.json
      def update
        if @user.update(user_params)
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # DELETE /users/1
      # DELETE /users/1.json
      def destroy
        @user.destroy
        respond_to do |format|
        #   format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      # GET /users/1/skills
      def skills
        @user = User.find(params[:user_id])
        @user_skills = []
        @user.skills.each { |skill|
          @user_skills << UserSkill.find_by(user_id: @user.id, skill_id: skill.id)
        }
        render 'user_skills/user_skills', formats: 'json', handlers: 'jbuilder'
      end

      # POST /users/1/skills/new
      def add_skill
        @user = User.find(params[:user_id])
        @skill = Skill.find_or_create_by(skill_params)
        if !@user.skills.include?(@skill)
          @user.skills << @skill
        end

        if @skill.save
          render json: @skill, status: :created
        else
          render json: @skill.errors, status: :unprocessable_entity
        end
      end

      # POST /users/1/skills/1/like
      def like
        @user_skill = UserSkill.find_by(user_id: params[:user_id], skill_id: params[:skill_id])
        @liking_user_id = params[:user][:user_id]
        @liking_user = User.find(@liking_user_id)
        @like = Like.find_or_create_by(:user_skill_id => @user_skill.id, :user_id => @liking_user.id)
        render json: @like, status: :created
      end

      # GET /users/1/skills/1/liking_user
      def liking_users
        @user_skill = UserSkill.find_by(user_id: params[:user_id], skill_id: params[:skill_id])
        @liking_users = @user_skill.users
        render json: @liking_users
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
          @user = User.find(params[:id])
        end

        # Never trust parameters from the scary internet, only allow the white list through.
        def user_params
          params.require(:user).permit(:name, :password, {:skill_ids => []})
        end

        def skill_params
          params.require(:skill).permit(:name)
        end
    end
  end
end
