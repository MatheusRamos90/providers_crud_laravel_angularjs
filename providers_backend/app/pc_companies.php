<?php
/**
 * Created by PhpStorm.
 * User: MatheusHR
 * Date: 11/04/2019
 * Time: 20:16
 */

namespace App;

use \Illuminate\Database\Eloquent\Model;

class pc_companies extends Model{

    protected $table = 'pc_companies';
    public $timestamps = false;

    protected $fillable = [
        'id', 'estado', 'nome_fantasia', 'cnpj', 'data_cadastro'
    ];

}