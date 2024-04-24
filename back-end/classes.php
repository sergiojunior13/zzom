<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


class userAction {
    public function addMusicToPlaylist() {
        // TODO: adicionar funcionalidade, (no returns), adicionar parâmetros: iddaplaylist e idmusica
        require "./Connection.php";
        $query = "SELECT * FROM users";
        $result = mysqli_query($mysqli, $query);

        mysqli_fetch_assoc($result);
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

class playlistActions {
    
    //TODO: adicionar métodos referentes às ações da playlist

}

$resulting = new userAction();
$resulting-> getFullPlaylistData();
