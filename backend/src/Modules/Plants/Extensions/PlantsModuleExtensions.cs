using Microsoft.Extensions.DependencyInjection;
using Plantarium.Modules.Plants.Application.Services;
using Plantarium.Modules.Plants.Domain.Interfaces;

namespace Plantarium.Modules.Plants.Extensions;
public static class PlantsModuleExtensions
{
    public static IServiceCollection AddPlantsModule(
        this IServiceCollection services)
    {
        services.AddScoped<IPlantRepository, PlantRepository>();
        services.AddScoped<IPlantService, PlantService>();

        return services;
    }
}