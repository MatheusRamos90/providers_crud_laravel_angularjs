<?php
/**
 * Created by PhpStorm.
 * User: MatheusHR
 * Date: 14/04/2019
 * Time: 16:50
 */

namespace App\Http\Controllers;

use App\pc_providers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class ProvidersController extends Controller{

    public function show(){

        try{

//            $providers = DB::select("SELECT *, company.nome_fantasia as empresa FROM pc_providers LEFT JOIN pc_companies company ON pc_providers.id_empresa = company.id ORDER BY pc_providers.data_cadastro DESC");
            $providers = DB::table('pc_providers as p')
                ->select('p.*' ,'c.nome_fantasia')
                ->leftJoin('pc_companies as c','p.id_empresa','=','c.id')
                ->orderBy('p.data_cadastro', 'desc')
                ->get();

            echo json_encode($providers);

        }catch(\Exception $e){
            echo "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage();
        }

    }

    public function find($id){

        try{

            $provider = DB::table('pc_providers as p')
                ->select('p.*' ,'c.nome_fantasia')
                ->leftJoin('pc_companies as c','p.id_empresa','=','c.id')
                ->where('p.id','=', $id)
                ->orderBy('p.data_cadastro', 'desc')
                ->get();

            echo json_encode(['status'=> true, 'message'=> $provider]);

        }catch(\Exception $e){
            echo "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage();
        }

    }

    public function update(Request $request, $id){

        try{

            $upt_provider = DB::table('pc_providers')->where('id', $id)->update([
                'id_empresa'=> $request->empresa,
                'nome'=> $request->nome,
                'telefone'=> $request->telefone,
                'tipo_pessoa'=> $request->tipo_pessoa,
                'nro_documento'=> $request->nro_documento,
                'nro_rg'=> $request->tipo_pessoa === 'juridica' ? '' : $request->nro_rg,
                'data_nascimento'=> $request->tipo_pessoa === 'juridica' ? null : Carbon::parse($request->data_nascimento)->format('Y-m-d')
            ]);

            if($upt_provider){

                echo json_encode(['status'=> true, 'message'=> 'Ok! O fornecedor foi modificado.']);
            }else{
                echo json_encode(['status'=> false, 'message'=> "Ops! Houve um erro na modificação."]);
            }

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

    public function filterBy(Request $request){

        try{

            $data_castro = $request->data_cadastro === null ? '' : Carbon::parse($request->data_cadastro)->format('Y-m-d');

//            $filterBy = DB::select("SELECT p.*,c.nome_fantasia
//                                            FROM pc_providers AS p
//                                            LEFT JOIN pc_companies AS c ON p.id_empresa = c.id
//                                            WHERE p.nome LIKE '%".$request->nome."%'
//                                            AND p.nro_documento LIKE '%".$request->nro_documento."%'
//                                            AND p.data_cadastro LIKE '%".$data_castro."%'
//                                            ORDER BY p.data_cadastro DESC");

            $filterBy = DB::table('pc_providers as p')
                ->select('p.*' ,'c.nome_fantasia')
                ->leftJoin('pc_companies as c','p.id_empresa','=','c.id')
                ->where('p.nome','like', '%'.$request->nome.'%')
                ->where('p.nro_documento','like', '%'.$request->nro_documento.'%')
                ->where('p.data_cadastro','like', '%'.$data_castro.'%')
                ->orderBy('p.data_cadastro', 'desc')
                ->get();

            if(sizeof($filterBy) > 0){
                echo json_encode(['status'=> true, 'message'=> $filterBy]);
            }else{
                echo json_encode(['status'=> false, 'message'=> "Ops! Nenhum resultado encontrado."]);
            }

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

    public function store(Request $request){

        $data_now = new \DateTime('now', new \DateTimeZone('America/Sao_Paulo'));
        $data = $data_now->format('Y-m-d H:i:s');

        try{

            $new_provider = new pc_providers();
            $new_provider->id_empresa = $request->empresa;
            $new_provider->nome = $request->nome;
            $new_provider->telefone = $request->telefone;
            $new_provider->tipo_pessoa = $request->tipo_pessoa;
            $new_provider->nro_documento = $request->nro_documento;
            $new_provider->nro_rg = $request->tipo_pessoa === 'juridica' ? '' : $request->nro_rg;
            $new_provider->data_nascimento = $request->tipo_pessoa === 'juridica' ? null : Carbon::parse($request->data_nascimento)->format('Y-m-d');
            $new_provider->data_cadastro = $data;

            if($new_provider->save()){

                echo json_encode(['status'=> true, 'message'=> 'Ok! Um novo fornecedor foi cadastrado.']);
            }

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

    public function delete($id){

        try{

            $delete = pc_providers::find($id)->delete();

            if($delete){

                echo json_encode(['status'=> true, 'message'=> 'Ok! Um fornecedor foi removido.']);
            }

        }catch(\Exception $e){
            echo json_encode(['status'=> false, 'message'=> "Ops! Parece que houve um erro interno. Erro: ". $e->getMessage()]);
        }

    }

}