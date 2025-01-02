<?php

namespace App\Http\Controllers;

use App\TypeEnum;
use App\Models\Movie;
use App\Models\MoviePossession;
use App\Models\MovieRenting;
use App\Models\Payment;
use App\Models\User;
use App\ResponseHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    private function makePayment(int $user_id, int $movie_id, TypeEnum $type, string $card_number)
    {
        $movie = Movie::find($movie_id);
        if ($movie === null) {
            throw new \Exception("Movie not found");
        }

        $user = User::find($user_id);
        if ($user === null) {
            throw new \Exception("User not found");
        }

        if ($type === TypeEnum::RENT) {
            $amount = $movie->rent_price;
        } else {
            $amount = $movie->sale_price;
        }

        Payment::create([
            'user_id' => $user_id,
            'movie_id' => $movie_id,
            'type' => $type,
            'card_number' => $card_number,
            'amount' => $amount
        ]);
    }

    public function rent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'card_number' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $user = auth()->user();
        $movie_id = $request->input('movie_id');

        try {
            $this->makePayment($user->id, $movie_id, TypeEnum::RENT, $request->input('card_number'));
        } catch (\Exception $e) {
            return ResponseHelper::buildNotFoundResponse($e->getMessage());
        }

        MovieRenting::create([
            'user_id' => $user->id,
            'movie_id' => $movie_id,
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now()->addDays(7)
        ]);

        return ResponseHelper::buildSuccessResponse();
    }

    public function buy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'card_number' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $user = auth()->user();
        $movie_id = $request->input('movie_id');

        try {
            $this->makePayment($user->id, $movie_id, TypeEnum::RENT, $request->input('card_number'));
        } catch (\Exception $e) {
            return ResponseHelper::buildNotFoundResponse($e->getMessage());
        }

        MoviePossession::create([
            'user_id' => $user->id,
            'movie_id' => $movie_id,
        ]);

        return ResponseHelper::buildSuccessResponse();
    }

    public function createMovie(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mb_id' => 'integer',
            'genres' => 'string',
            'age_restriction' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'string',
            'poster_url' => 'required|string',
            'video_url' => 'required|string',
            'director' => 'required|string',
            'writers' => 'required|string',
            'cast' => 'required|string',
            'release_date' => 'required|date',
            'movie_duration' => 'required|integer',
            'trailer_url' => 'required|string',
            'rent_price' => 'required|numeric',
            'sale_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $mb_id = $request->input('mb_id');

        if (!$mb_id) $mb_id = null;

        $movie = Movie::create([
            'mb_id' => $mb_id,
            'genres' => $request->input('genres'),
            'age_restriction' => $request->input('age_restriction'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'poster_url' => $request->input('poster_url'),
            'video_url' => $request->input('video_url'),
            'director' => $request->input('director'),
            'writers' => $request->input('writers'),
            'cast' => $request->input('cast'),
            'release_date' => $request->input('release_date'),
            'movie_duration' => $request->input('movie_duration'),
            'trailer_url' => $request->input('trailer_url'),
            'rent_price' => $request->input('rent_price'),
            'sale_price' => $request->input('sale_price'),
        ]);

        return ResponseHelper::buildSuccessResponse($movie);
    }

    public function editMovie(Request $request)
    {
        $id = $request->input('id');

        $movie = Movie::find($id);

        if ($movie === null) {
            return ResponseHelper::buildNotFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'mb_id' => 'integer',
            'genres' => 'string',
            'age_restriction' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'string',
            'poster_url' => 'required|string',
            'video_url' => 'required|string',
            'director' => 'required|string',
            'writers' => 'required|string',
            'cast' => 'required|string',
            'release_date' => 'required|date',
            'movie_duration' => 'required|integer',
            'trailer_url' => 'required|string',
            'rent_price' => 'required|numeric',
            'sale_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::buildValidationErrorResponse($validator->errors());
        }

        $mb_id = $request->input('mb_id');

        if (!$mb_id) $mb_id = null;

        $movie->save([
            'mb_id' => $mb_id,
            'genres' => $request->input('genres'),
            'age_restriction' => $request->input('age_restriction'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'poster_url' => $request->input('poster_url'),
            'video_url' => $request->input('video_url'),
            'director' => $request->input('director'),
            'writers' => $request->input('writers'),
            'cast' => $request->input('cast'),
            'release_date' => $request->input('release_date'),
            'movie_duration' => $request->input('movie_duration'),
            'trailer_url' => $request->input('trailer_url'),
            'rent_price' => $request->input('rent_price'),
            'sale_price' => $request->input('sale_price'),
        ]);

        return ResponseHelper::buildSuccessResponse($movie);
    }

    public function deleteMovie(Request $request)
    {
        $id = $request->input('id');

        $movie = Movie::find($id);

        if ($movie === null) {
            return ResponseHelper::buildNotFoundResponse();
        }

        $movie->delete();

        return ResponseHelper::buildSuccessResponse();
    }

    public function getMovies()
    {
        $movies = Movie::get();

        return ResponseHelper::buildSuccessResponse(['movies' => $movies]);
    }

    public function getMovie(Request $request)
    {
        $id = $request->input('id');

        $movie = Movie::find($id);

        if ($movie === null) {
            return ResponseHelper::buildNotFoundResponse();
        }

        $allowedToWatchMovie = false;

        $moviePossession = MoviePossession::where('movie_id', $id)
            ->where('user_id', auth()->user()->id)
            ->first();

        if ($moviePossession !== null) $allowedToWatchMovie = true;

        if (!$allowedToWatchMovie) {
            $movieRenting = MovieRenting::where('movie_id', $id)
                ->where('user_id', auth()->user()->id)
                ->where('ends_at', '>', Carbon::now())
                ->first();

            if ($movieRenting !== null) $allowedToWatchMovie = true;
        }

        $movie->makeVisibleIf($allowedToWatchMovie, ['video_url']);

        return ResponseHelper::buildSuccessResponse(["movie" => $movie]);
    }
}
