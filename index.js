<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Audiometrická hra</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="styles.css">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body >

  <div class="container mt-2">
    <div class="row" >
      <div class=" text-center "><h1 class="mb-5 amgheading">Audiometrická hra<h1></div>
    </div>
    <div class="col-12 amgwarning text-center d-none  bg-primary m-1"></div>
    <div class="row amg mb-3"> 
      <div class=" col-sm-12 col-md-8 col-lg-8 text-center">
        <img class="amggif "  src ="images/button-162066_640.png" />
      </div>
      <div class="col-sm-12 col-md-4  col-lg-4  align-self-end" > 
        <div class=" text-end m-3"> 
        <div class="amgspeedoptions ">
          <input type="range" class="form-range amgspeed  " value="1" min="1" max="2" >

          <div class="d-flex justify-content-between">
            <span class="m-1">Pomalu</span> <span class="m-1">Rychle</span>
          </div>
          </div>
          <div class=" d-flex justify-content-between mt-5">
          <button class="btn btn-primary amgstartstop  p-3 m-1 ">Start</button> 
          <button class="btn btn-outline-secondary amghelp p-3 m-1">Pomoc</button> 
          </div>
        </div>
        
    </div>
  </div>
</div>

  </div>



  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <script src="./index.js"charset="utf-8"></script>
</body>



 <!-- Footer and legal disclaiment --> 
<footer>
  Made by Teta Paja pro nejmenší děti jako příprava na vyšetření sluchu (VRA). Obrázky staženy z <a class="text-muted" href="https://pixabay.com/gifs/">https://pixabay.com/gifs/</a> na základě jejich volné licence.</p>


</footer>


</html>
