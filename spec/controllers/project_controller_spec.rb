require 'rails_helper'

RSpec.describe ProjectController, type: :controller do
  before do
    @user = User.create(email: 'test@email.com', password: '112233')
    sign_in(@user)
    @project1 = @user.projects.create(title: '1')
    @project2 = @user.projects.create(title: '2')
    Bullet.start_request
  end

  describe "authenticate_user protection" do
    context "when user is not logged in" do
      it "redirects to sign_in" do
        sign_out(@user)
        get :index
        expect(response).not_to render_template("index")
      end
    end

    context "when user is logged in" do
      it "renders template" do
        get :index
        expect(response).to render_template("index")
      end
    end
  end

  describe "#index" do
    it "returns records and render template" do
      get :index
      projects = assigns(:projects)
      expect(projects).to be_a(ActiveModelSerializers::SerializableResource)
      expect(response).to render_template("index")
    end
  end
end
