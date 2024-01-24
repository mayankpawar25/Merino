<?php
session_start();

// Include the database connection file
include('../../connection/connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Query to fetch user details from the database
    $sql = "SELECT * FROM users WHERE email_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the password
        if ($password == $user['password']) {
            // Password is correct, set session variables and redirect
            $_SESSION['name'] = $user['name'];
            $_SESSION['mobile_number'] = $user['mobile_number'];
            $_SESSION['email_id'] = $user['email_id'];
            $_SESSION['registration_number'] = $user['registration_number'];
            $_SESSION['role'] = $user['role'];
            header('Location: ../dashboard.php'); // Redirect to the dashboard or another secure page
            exit();
        } else {
            header('Location: ../login.php?msg=Incorrect password'); // Redirect to the dashboard or another secure page
        }
    } else {
        header('Location: ../login.php?msg=User not found'); // Redirect to the dashboard or another secure page
    }
}
?>
