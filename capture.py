import cv2
import mysql.connector

def capture_image(user_id):
    # Start webcam
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        print("Cannot access camera.")
        return

    print("Press SPACE to capture image...")
    while True:
        ret, frame = cam.read()
        cv2.imshow("Capture Image", frame)
        key = cv2.waitKey(1)
        if key % 256 == 32:  # Space key
            image_filename = f"{user_id}.jpg"
            cv2.imwrite(image_filename, frame)
            break

    cam.release()
    cv2.destroyAllWindows()

    # Read image as binary
    with open(image_filename, 'rb') as file:
        binary_data = file.read()

    return binary_data

def save_image_to_db(user_id, image_binary):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root123',
            database='vote'
        )
        cursor = connection.cursor()

        sql = "INSERT INTO user_images (user_id, image) VALUES (%s, %s)"
        cursor.execute(sql, (user_id, image_binary))
        connection.commit()

        print("Image successfully saved to database.")
        cursor.close()
        connection.close()

    except mysql.connector.Error as err:
        print("Error:", err)

# Usage
user_id = input("Enter your user ID: ")
image_data = capture_image(user_id)
if image_data:
    save_image_to_db(user_id, image_data)
