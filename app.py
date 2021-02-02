from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f3cfe9ed8fae309f02079dbf'


@app.route('/')
def show_home():
    return render_template('homepage.html')


@app.route('/login')
def login_user():
    return render_template('login.html')


@app.route('/register')
def register_user():
    return render_template('register.html')
