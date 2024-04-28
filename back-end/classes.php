<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "./../vendor/autoload.php";


class playlistActions {

    //! Preciso do modelo do JSON, assim, consigo modificar os valores corretos dos índices corretos

    public function addMusicToPlaylist() {
        // TODO: adicionar funcionalidade, (no returns), adicionar parâmetros: iddaplaylist e idmusica
        require "./Connection.php";

        $query = "SELECT playlist FROM users";

        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);

        $playlistObject = json_decode($result['playlist'], true);
        dump($playlistObject);
        dump($playlistObject['playlists'][0]['musicas'][0]['titulo']);

    }

    public function removeMusicFromPlaylist() {
        //TODO: adicionar funcionalidade, (no return), adicionar parâmetros: iddaplaylist e idmusica
        require "./Connection.php";
        $query = "SELECT playlist FROM users";
        $result = mysqli_query($mysqli, $query);

        $playlist = mysqli_fetch_assoc($result);

        // Bota em objeto php, modifica, e dps volta pra JSON e update na tabela;
        var_dump(json_decode($playlist["playlist"]));
    }

    public function getFullPlaylistData() {
        //TODO: precisa retornar info da playlist, adicionar parâmetros: iddaplaylist
        require "./Connection.php";

        $query = "SELECT playlist FROM users";
        $result = mysqli_query($mysqli, $query);

        $playlist = mysqli_fetch_assoc($result);

        var_dump(json_decode($playlist["playlist"]));
    }
}

class userActions {

    public function sign($username, $password) {
        require "./Connection.php";

        $query = "SELECT username FROM users WHERE username = '$username'";
        $searchSignedUser = mysqli_query($mysqli, $query);
        $searchSignedUser = mysqli_fetch_assoc($searchSignedUser);

        if ($searchSignedUser == null) {
            $query = "INSERT INTO users VALUES (0, '$username', '$password', '{}')";
            $updatingTable = mysqli_query($mysqli, $query);
            return "Usuário cadastrado!";
        } else {
            return "Nome de usuário já existe, tente outro nome!";
        }


        
    }

    public function login($nickname, $password) {
        //TODO: Deve verificar se usuario existe e se existe verifica se a senha está correta.
        require "./Connection.php";
        
        $query = "SELECT username, keyphrase FROM users WHERE username = '$nickname' AND keyphrase = '$password'";
        $searchUser = mysqli_query($mysqli, $query);
        $searchUser = mysqli_fetch_assoc($searchUser);

        if ($searchUser == null) {
            return "Usuário e/ou senha incorretos!";
        }

    }

}

$resulting = new userActions();
$resulting-> sign("Frederico", "Megatron");
