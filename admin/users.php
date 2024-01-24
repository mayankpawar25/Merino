<?php
include('action/verifyUser.php');

// Include the database connection file
include('../connection/connection.php');

// SQL query to select all data from the "user" table
$sql = "SELECT * FROM users";

// Execute the query
$result = $conn->query($sql);

// Check if the query was successful
if ($result) {
    // Check if there are rows returned
    if ($result->num_rows > 0) {
        // Loop through each row and display the data
        $users = $result->fetch_all(MYSQLI_ASSOC);
    } else {
        echo "No records found in the user table.";
    }
} else {
    echo "Error: " . $conn->error;
}

// Close the database connection
$conn->close();

include('layout/head.php');
?>


<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php
            include('layout/nav.php');
        ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <?php
                    include('layout/topNav.php'); 
                ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">User Table</h1>
                    <p class="mb-4"></p>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">User Table</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>S no.</th>
                                            <th>Name</th>
                                            <th>Mobile Number</th>
                                            <th>Email ID</th>
                                            <th>Password</th>
                                            <th>Date of Birth</th>
                                            <th>ID Proof Number</th>
                                            <th>T-Shirt Size</th>
                                            <th>Registration Number</th>
                                            <th>Role</th>
                                            <th>Signed up on</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>S no.</th>
                                            <th>Name</th>
                                            <th>Mobile Number</th>
                                            <th>Email ID</th>
                                            <th>Password</th>
                                            <th>Date of Birth</th>
                                            <th>ID Proof Number</th>
                                            <th>T-Shirt Size</th>
                                            <th>Registration Number</th>
                                            <th>Role</th>
                                            <th>Signed up on</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php
                                            if (!empty($users)) {
                                                // Loop through each row and display the data
                                                foreach ($users as $index => $user) {
                                                    echo "<tr>";
                                                    echo "<td>" . $index+1 . "</td>";
                                                    echo "<td>" . $user['name'] . "</td>";
                                                    echo "<td>" . $user['mobile_number'] . "</td>";
                                                    echo "<td>" . $user['email_id'] . "</td>";
                                                    echo "<td>" . $user['password'] . "</td>";
                                                    echo "<td>" . $user['dob'] . "</td>";
                                                    echo "<td>" . $user['id_proof_number'] . "</td>";
                                                    echo "<td>" . $user['t_shirt_size'] . "</td>";
                                                    echo "<td>" . $user['registration_number'] . "</td>";
                                                    echo "<td>" . $user['role'] . "</td>";
                                                    echo "<td>" . $user['created_at'] . "</td>";
                                                    echo '<td> 
                                                        <a type="button" href="edit_speaker.php?id='.$user['id'].'" class="btn btn-primary btn-sm">Edit</button>
                                                        <a type="button" href="edit_speaker.php?id='.$user['id'].'" class="btn btn-primary btn-sm mt-1">Bookings</button>
                                                    </td>';
                                                    echo "</tr>";
                                                }
                                            } else {
                                                echo "<tr><td colspan='3'>No records found in the user table.</td></tr>";
                                            }
                                        ?>    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2020</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <?php
        include('layout/scrollToTop.php');
    ?>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>

</body>

</html>