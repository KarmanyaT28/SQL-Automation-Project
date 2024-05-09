#!/usr/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

# Connect to the database
my $host = 'localhost';
my $database = 'SECPRDDB';
my $username = 'your_username';
my $password = 'your_password';
my $dbh = DBI->connect("DBI:mysql:database=$database;host=$host", $username, $password)
    or die "Could not connect to database: $DBI::errstr";

# Get form data
my $cgi = CGI->new;
my $nonUserId = $cgi->param('nonUserId');
my $newEmployeeId = $cgi->param('newEmployeeId');

# Execute SQL queries
my $select_query = "SELECT * FROM user_tool WHERE user_nm = ?";
my $update_query = "UPDATE user_tool SET EE_CONTR_ID = ?, UPDT_USER_ID = ? WHERE user_nm = ?";

my $select_sth = $dbh->prepare($select_query);
$select_sth->execute($nonUserId);
my $row = $select_sth->fetchrow_hashref;

if ($row) {
    my $update_sth = $dbh->prepare($update_query);
    $update_sth->execute($newEmployeeId, 'yourSecondaryID', $nonUserId);
    print "Update successful!";
} else {
    print "Non-user ID not found!";
}

# Disconnect from the database
$dbh->disconnect;
