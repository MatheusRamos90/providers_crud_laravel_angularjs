<?php
/**
 * Created by PhpStorm.
 * User: MatheusHR
 * Date: 11/04/2019
 * Time: 20:16
 */

namespace App;

use \Illuminate\Database\Eloquent\Model;

class pc_providers extends Model{

    protected $table = 'pc_providers';
    public $timestamps = false;

    protected $fillable = [
        'id', 'id_empresa', 'nome', 'telefone', 'tipo_pessoa', 'nro_documento', 'nro_rg', 'data_nascimento', 'data_cadastro'
    ];

}