using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using heladeria.Config;
using heladeria.Services;
using heladeria.Utils.Filters;
using heladeria.Models;
using heladeria.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Heladeria puntoHelado",
        Version = "v1"
    });

    c.AddSecurityDefinition("token", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Token JWT"
    });

    c.OperationFilter<AuthOperationFilter>();
});

//Services
builder.Services.AddScoped<HeladosService>();
builder.Services.AddScoped<TamaniosService>();
builder.Services.AddScoped<SalsasService>();
builder.Services.AddScoped<TiposHeladoService>();
builder.Services.AddScoped<SaboresService>();
builder.Services.AddScoped<UsuariosService>();
builder.Services.AddScoped<RolesService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEncoderService, EncoderService>();

//Repositories
builder.Services.AddScoped<IRepository<Helado>, Repository<Helado>>();
builder.Services.AddScoped<IRepository<Tamanio>, Repository<Tamanio>>();
builder.Services.AddScoped<IRepository<Salsa>, Repository<Salsa>>();
builder.Services.AddScoped<IRepository<TipoHelado>, Repository<TipoHelado>>();
builder.Services.AddScoped<IRepository<Sabor>, Repository<Sabor>>();
builder.Services.AddScoped<IRepository<Usuario>, Repository<Usuario>>();
builder.Services.AddScoped<IRepository<Rol>, Repository<Rol>>();

//Database --> conexion base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
{
    string conn = builder.Configuration.GetConnectionString("dbDev") ?? string.Empty;
    options.UseSqlServer(conn);
});

//Secret
string secret = builder.Configuration.GetSection("JWT:Secret").Value ?? string.Empty;

// Auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        var key = Encoding.UTF8.GetBytes(secret);
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//consumir la API desde un frontend,
app.UseCors(opt =>
{
    opt.AllowAnyHeader();
    opt.AllowAnyMethod();
    opt.AllowAnyOrigin();
});

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
