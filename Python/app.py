from flask import Flask, render_template, request
import pymysql

app = Flask(__name__)

# Database connection parameters
host = 'your_database_host'
user = 'your_database_username'
password = 'your_database_password'
database = 'SECPRDDB'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update', methods=['POST'])
def update():
    non_user_ids = request.form.getlist('non_user_id')
    new_employee_id = request.form['new_employee_id']
    
    conn = pymysql.connect(host=host, user=user, password=password, database=database)
    cursor = conn.cursor()

    # Batch process the queries
    for non_user_id in non_user_ids:
        cursor.execute("UPDATE user_tool SET EE_CONTR_ID = %s, UPDT_USER_ID = %s WHERE user_nm = %s", (new_employee_id, 'yourSecondaryID', non_user_id))
    
    conn.commit()
    conn.close()
    
    return 'Updated successfully'

if __name__ == '__main__':
    app.run(debug=True)
