<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "./../vendor/autoload.php";

// $hardcodedPlaylists = [
//     {
//       name: "Playlist 1",
//       id: "1",
//       musics: [
//         { id: "1", band: "Teste", title: "Titulo" },
//         { id: "2", band: "Teste 2", title: "Titulo 2" },
//       ],
//     },
//     {
//       name: "Playlist 2",
//       id: "2",
//       musics: [
//         { id: "1", band: "Teste playlist 2", title: "Titulo playlist 2" },
//         { id: "2", band: "Teste playlist 2 2", title: "Titulo playlist 2 2" },
//       ],
//     },
//   ];


// '[{"name":"Playlist 1","id":"1","musics":[{"id":"1","band":"Teste","title":"Titulo"},{"id":"2","band":"Teste 2","title":"Titulo 2"}]},{"name":"Playlist 2","id":"2","musics":[{"id":"1","band":"Teste playlist 2","title":"Titulo playlist 2"},{"id":"2","band":"Teste playlist 2 2","title":"Titulo playlist 2 2"}]}]'

class playlistActions
{

    public static function createPlaylist($userName, $playlistName) 
    {
        require "./Connection.php";

        static $playlistID = 0;

        // Verifica se existe usuário
        $query = "SELECT username FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);
        
        if ($result == null) {
            return "Usuário não encontrado";
            exit();
        }


        // Pesquisa por playlist
        $query = "SELECT playlist FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);

        $arrayPlaylist = json_decode($result["playlist"], true);

        // Geração automática de ID da playlist
        for ($v = 0; $v < count($arrayPlaylist); $v++) {
            $getId = $arrayPlaylist[$v]["id"];

            $existentID = null;
            if ($getId == $playlistID) {
                $existentID = true;
            }

            if ($existentID) {
                $playlistID = $getId + 1;
            }

        }


        $key = array_keys($arrayPlaylist);
        $getLastKey = end($key);

        // Verifica se o JSON ta vazio
        if (count($arrayPlaylist) == 0) {
            $arrayPlaylist[0] = ["name" => "$playlistName", "id" => $playlistID, "musics" => []];
        } else {
            $arrayPlaylist[$getLastKey + 1] = ["name" => "$playlistName", "id" => $playlistID, "musics" => []];
        }

        $newJson = json_encode($arrayPlaylist);
        $updatePlaylist = "UPDATE users SET playlist = '$newJson' WHERE username = '$userName'";
        $update = mysqli_query($mysqli, $updatePlaylist);
    }

    public static function addMusicToPlaylist($userName, $idPlaylist, $idMusic, $band, $musicTitle)
    {

        // Para usar essa função recomendo puxar todas as infos das playlists e pegar o id de uma playlist e inserí-lo aqui nesse parâmetro

        // Importa conexão
        require "./Connection.php";

        // Query para pegar a playlist do usuário $userName
        $query = "SELECT playlist FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);

        $getFullPlaylist = $result["playlist"];

        // Pega a playlist que era string e transforma em array associativo
        $playlistObject = json_decode($getFullPlaylist, true);

        // Pega a última chave do array associativo
        $key = array_keys($playlistObject[$idPlaylist]["musics"]);
        $lastKey = end($key);


        // Cria uma nova chave e adiciona valores
        $playlistObject[$idPlaylist]["musics"][$lastKey + 1] = ["id" => "$idMusic", "band" => "$band", "title" => "$musicTitle"];

        // Volta para JSON, string
        $newJson = json_encode($playlistObject);

        // Atualiza no DB
        $queryUpdate = "UPDATE users SET playlist = '$newJson' WHERE username = '$userName'";
        $updatePlaylist = mysqli_query($mysqli, $queryUpdate);
    }

    public static function removeMusicFromPlaylist($userName, $idPlaylist, $idMusic)
    {

        require "./Connection.php";
        $query = "SELECT playlist FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);

        $playlist = mysqli_fetch_assoc($result);

        $arrayPlaylist = json_decode($playlist['playlist'], true);

        
        if ($arrayPlaylist[$idPlaylist]['musics'][$idPlaylist]['id'] == $idMusic) {
            unset($arrayPlaylist[$idPlaylist]['musics'][$idPlaylist]);
            
        } else {
            echo "Música não encontrada!";
        }

        
        $newJson = json_encode($arrayPlaylist);
        $update = "UPDATE users set playlist = '$newJson' WHERE username = '$userName'";
        $runUpdate = mysqli_query($mysqli, $update);
    }

    public static function getFullPlaylistData($userName)
    {
        //TODO: precisa retornar info da playlist, adicionar parâmetros: iddaplaylist
        require "./Connection.php";

        // Verifica se existe usuário
        $getUser = "SELECT username FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $getUser);
        $result = mysqli_fetch_assoc($result);

        if ($result == null) {
            exit("Usuário não encontrado!");
        }

        $query = "SELECT playlist FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);

        $playlist = mysqli_fetch_assoc($result);

        return $playlist;
    }
}


class userActions
{
    public static function sign($username, $password)
    {
        require "./Connection.php";

        $query = "SELECT username FROM users WHERE username = '$username'";
        $searchSignedUser = mysqli_query($mysqli, $query);
        $searchSignedUser = mysqli_fetch_assoc($searchSignedUser);

        if ($searchSignedUser == null) {
            $query = "INSERT INTO users VALUES (0, '$username', '$password', '{}')";
            $updatingTable = mysqli_query($mysqli, $query);
            return "Usuário cadastrado!";

        } else {
            http_response_code(400);
            return "Nome de usuário já existe, tente outro nome!";
        }
    }

    public static function login($nickname, $password)
    {
        require "./Connection.php";

        $query = "SELECT username, keyphrase FROM users WHERE username = '$nickname' AND keyphrase = '$password'";
        $searchUser = mysqli_query($mysqli, $query);
        $searchUser = mysqli_fetch_assoc($searchUser);

        if ($searchUser == null) {
            http_response_code(400);
            return "Usuário e/ou senha incorretos!";
        }
    }
}

playlistActions::getFullPlaylistData('Júlio');
