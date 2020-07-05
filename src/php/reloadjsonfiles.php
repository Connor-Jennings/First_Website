<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // --------------------  query database  ---------------------------
	$db = new mysqli('localhost', 'pi', 'raspberry', 'Notitia');
	if(mysqli_connect_errno()){
	//	echo '<p>Error: Could not connect to database.<br/></p>';
		exit;
    }else{
       // echo '<p>Connection established<br/></p>';
    }

    // Get trip_list data 
    $list_query = "SELECT * FROM trip_list";
    $result = $db->query($list_query);
    
    $trip_list_array = array(); // I will want the names of the trips later so this is in a bigger scope
    $it = 0;                    // I will also want the number of trips 
    if ($result->num_rows > 0) {
        // fromat data from each frow 
      //  echo "<table><tr><th>TITLE</th><th>CREATED_ON</th></tr>";
        $obj = (object) ["title" => "Last_Transmission", "path"=> "data/lastTransmission.json"];
        $trip_list_array[$it] = $obj;
        $it += 1;
        while($row = $result->fetch_assoc()) {
            $row_obj = (object) ["title" => $row["TITLE"], "path"=> "data/".$row["TITLE"].".json"];
            $trip_list_array[$it] = $row_obj;
     //       echo "<tr><td>".$row["TITLE"]."</td><td>".$row["CREATED_ON"]."</td></tr>";
            $it += 1;
        }
    //    echo "</table>";

        // Put data into tripList.json file
        $JSONdata = json_encode((object)["tripList"=> $trip_list_array]);
        file_put_contents("../data/tripList.json", $JSONdata);

    } else {
      //  echo "0 results";
    }

    //echo "--------------------- TRIPS ----------------------------";
    // For each trip in the database create a file and fill it with data 
     while($it >= 0){
        $title = $trip_list_array[$it]->title;
        $trip_query = "SELECT * FROM $title";
        $trip_result = $db->query($trip_query);

        if ($trip_result->num_rows > 0) {
            // fromat data from each frow 
        //    echo "<table><tr><th>TITLE</th><th>CREATED_ON</th></tr>";
            
            $item_number = 0;
            $list_array = array();
            while($row = $trip_result->fetch_assoc()) {
                if($item_number == 0){
                    $row_obj = (object) ["title" => $trip_list_array[$it]->title ] ;
                    $list_array[$item_number] = $row_obj;
               //     echo "<tr><td>".$trip_list_array[$it]->title."</td><td></td></tr>";
                   
                }
                //{"lat":"32.9854","lng":"-117.1642","timeStamp":"19:22","text":"I am still alive"},
                $row_obj = (object) ["lat" => $row["LAT"], "lng"=> $row["LNG"], "timeStamp"=> $row["TIMESTMP"], "text"=> $row["TXT"]];
                $list_array[$item_number] = $row_obj;
              //  echo "<tr><td>".$row["LAT"]."</td><td>".$row["LNG"]."</td></tr>";
                
                $item_number += 1;
            }
           // echo "</table>";
    
            // Put data into JSON file
            $JSONdata = json_encode((object)["trip"=> $list_array]);
            file_put_contents("../data/".$trip_list_array[$it]->title.".json", $JSONdata);
    
        } else {
        //    echo "0 results";
        }
        $it -=1;
     }
    $db->close();
?>