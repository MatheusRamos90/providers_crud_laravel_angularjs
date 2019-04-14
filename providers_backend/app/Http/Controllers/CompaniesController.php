<?php
/**
 * Created by PhpStorm.
 * User: MatheusHR
 * Date: 14/04/2019
 * Time: 16:53
 */

namespace App\Http\Controllers;

use App\pc_companies;
use App\pc_providers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CompaniesController extends Controller{

    public function show(){

        try{

            $companies = DB::table('pc_companies')->orderBy('nome_fantasia', 'desc')->get();

            echo json_encode($companies);

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

    public function find($id){

        try{

            $companie = pc_companies::where('id', $id)->get()->first();

            echo json_encode($companie);

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

    public function store(Request $request){

        $data_now = new \DateTime('now', new \DateTimeZone('America/Sao_Paulo'));
        $data = $data_now->format('Y-m-d H:i:s');

        try{

            $new_companie = new pc_companies();
            $new_companie->estado = $request->estado;
            $new_companie->nome_fantasia = $request->nome_fantasia;
            $new_companie->cnpj = $request->cnpj;
            $new_companie->data_cadastro = $data;

            if($new_companie->save()){

                echo json_encode(['status'=> true, 'message'=> 'Ok! Uma nova empresa foi cadastrada.']);
            }

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

    public function delete($id){

        $check_providers_ = pc_providers::where('id_empresa', $id)->get();

        if(sizeof($check_providers_) > 0){
            for($i = 0;$i < sizeof($check_providers_);$i++){

                try{
                    $upt_providers = pc_providers::where('id', $check_providers_[$i]->id)->update(['id_empresa'=> null]);

                    if($upt_providers){
                        try{

                            $delete = pc_companies::find($id)->delete();

                            if($delete){

                                echo json_encode(['status'=> true, 'message'=> 'Ok! Uma empresa foi removida.']);
                            }else{
                                echo json_encode(['status'=> false, 'message'=> 'Ops! Parece que houve um erro na remoção.']);
                            }

                        }catch(\Exception $e){
                            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
                        }
                    }

                }catch(\Exception $e){
                    echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
                }
            }
        }else{

            try{

                $delete = pc_companies::find($id)->delete();

                if($delete){

                    echo json_encode(['status'=> true, 'message'=> 'Ok! Uma empresa foi removida.']);
                }else{
                    echo json_encode(['status'=> false, 'message'=> 'Ops! Parece que houve um erro na remoção.']);
                }

            }catch(\Exception $e){
                echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
            }
        }

    }

}