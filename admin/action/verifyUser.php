<?php
@session_start();
if($_SESSION['role'] != 'admin') {
    session_destroy();
    header('location: ../login.php?msg=Not Authorised to access this page');
}
?>