from flask import Blueprint, request, jsonify
from app.services.auth_service import register_user, login_user

register_bp = Blueprint("register_bp", __name__)
login_bp = Blueprint("login_bp", __name__)

@register_bp.route("/", methods=["POST"])
def register():
    #get request
    data = request.json
    
    #cek validasi request username, email, dan password
    required_data = ["username", "email", "password"]
    if not all(fields in data and data[fields] for fields in required_data):
        return jsonify({"message": "Username, email, and password required"}), 422

    #call register service
    user, msg = register_user(
        input_username=data["username"],
        input_email=data["email"],
        input_password=data["password"]
    )
    
    #cek register berhasil atau tidak
    if not user:
        return jsonify({"message": msg}), 400
    
    user_data = {
        "username": user.username,
        "email": user.email
    }
    
    return jsonify({"data": user_data, "message": "Register Success"}), 201

@login_bp.route("/", methods=["POST"])
def login():
    #get request
    data = request.json
    
    #cek validasi request username dan password
    required_data = ["username", "password"]
    if not all(fields in data and data[fields] for fields in required_data):
        return jsonify({"message": "Username and password required"}), 422

    #call login service
    user_data, msg = login_user(data["username"],data["password"])
    
    #cek login berhasil atau tidak
    if not user_data:
        return jsonify({"message": msg}), 401
    
    return jsonify({"data": user_data, "message": "Login Success"}), 200